import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { ConfigService } from '../../../config/config.service';
import queryString from 'querystring';

@Injectable()
export class GoogleAuthService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: `${this.configService.get(
        'SERVER_ROOT_URI',
      )}/${this.configService.get('REDIRECT_URI')}`,
      client_id: this.configService.get('GOOGLE_CLIENT_ID'),
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    return `${rootUrl}?${queryString.stringify(options)}`;
  }

  async getTokensGoogle({
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }): Promise<{
    access_token: string;
    //expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    return axios
      .post(url, queryString.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
      });
  }

  async getGoogleUser(req: any, res: any) {
    const code = req.query.code;
    const { id_token, access_token } = await this.getTokensGoogle({
      code,
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: `${this.configService.get(
        'SERVER_ROOT_URI',
      )}/${this.configService.get('REDIRECT_URI')}`,
    });

 
    const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
            Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
    });

    const token = this.jwtService.sign(googleUser);

    res.cookie(this.configService.get('COOKIE_NAME'), token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });

    res.redirect(this.configService.get('APP_ROOT_URI'));  
    }

  async getCurrentUser(req: any, res: any) {
    console.log('get user');
    try {
      const decoded = this.jwtService.verify(
        req.cookies[this.configService.get('COOKIE_NAME')],
        );
      console.log('decoded', decoded);
        return res.send(decoded);
    } catch (err) {
        console.log(err);
      res.send('No Data');
        }
    }

}
