import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import axios from 'axios';
import { ConfigService } from '../../config/config.service';
import queryString from 'querystring';

@Injectable()
export class FacebookAuthService {
  constructor(
    //@Inject(ConfigService) private configService: ConfigService,
    private configService: ConfigService,
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getFacebookAuthURL() {
    const rootUrl = 'https://www.facebook.com/v16.0/dialog/oauth';
    const options = {
      redirect_uri: `https://localhost:4000/auth/facebook`,
      client_id: '161637870174443',
      //access_type: 'offline',
      response_type: 'code',
      //prompt: 'consent',
      //auth_type: 'rerequest',
      //display: 'popup',
      //version: 'v16.0',
      scope: ['email', 'name', 'id'].join(','),
    };
    return `${rootUrl}?${queryString.stringify(options)}`;
  }

  async getTokensFacebook({
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
    //refresh_token: string;
    scope: string;
    id_token: string;
  }> {
    const url = 'https://graph.facebook.com/v16.0/oauth/access_token?';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      //grant_type: 'authorization_code',
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

  async getFacebookUser(req: Request, res: Response) {
    const code: any = req.query.code;
    const { id_token, access_token } = await this.getTokensFacebook({
      code,
      clientId: '161637870174443',
      clientSecret: 'e8f29ad7aa4256a97757b7cafb71087d',
      redirectUri: `https://localhost:4000/auth/facebook`,
    });

    const facebookUser = await axios
      .get(
        `https://graph.facebook.com/v16.0/me?fields=id%2Cname%2Cemail&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });

    const token = this.jwtService.sign(facebookUser);

    res.cookie('auth_custm', token, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    res.redirect(`https://localhost:4000/auth/facebook`);
  }

  async getCurrentFacebookUser(req: Request, res: Response, cookies: string) {
    console.log('get Facebook user');
    try {
      //const getCoockies: string | undefined = req.cookies[name];
      console.log('GET_COOCKIES_FACEBOOK', cookies);
      if (cookies) {
        const decoded = this.jwtService.verify(cookies);
        console.log('decoded FACEBOOK', decoded);
        return decoded;
      } else {
        console.log('Користувач Facebook не авторизован');
      }
    } catch (err) {
      console.log(err);
      res.send('No Data');
    }
  }
}
