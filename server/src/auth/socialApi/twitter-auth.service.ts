import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { CustomersService } from '../../customers/customers.service';
import queryString from 'querystring';
import axios from 'axios';
import { Request, Response } from 'express';
import { randomInt } from 'crypto';

@Injectable()
export class TwitterAuthService {
  constructor(
    private configService: ConfigService,
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async getTwitterAuthURL() {
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `https://localhost:4000/auth/twitter`,
      client_id: 'LXRNSzl1cmszbXhkZHlQRVNuei06MTpjaQ',
      state: 'state',
      response_type: 'code',
      code_challenge: 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8',
      code_challenge_method: 'S256',
      scope: ['users.read', 'tweet.read'].join(' '),
    };
    return `${rootUrl}?${queryString.stringify(options)}`;
  }

  BasicAuthToken = Buffer.from(
    `${'LXRNSzl1cmszbXhkZHlQRVNuei06MTpjaQ'}:${'rMIqWIQ3aU0CKx9ExjBRrGfrUvhR5jCkbp4ilWtKGkd1Ty0gwz'}`,
    'utf8',
  ).toString('base64');

  async getTokensTwitter({
    code,
    clientId,
    clientSecret,
    redirectUri,
    code_verifier,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code_verifier: string;
  }): Promise<{
    access_token: string;
    //expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }> {
    const url = 'https://api.twitter.com/2/oauth2/token';
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      //grant_type: 'client_credentials',
      code_verifier: code_verifier,
    };

    return axios
      .post(url, queryString.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${this.BasicAuthToken}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
      });
  }

  async getTwitterUser(req: Request, res: Response) {
    try {
      const code: any = req.query.code;
      const { id_token, access_token } = await this.getTokensTwitter({
        code,
        clientId: 'LXRNSzl1cmszbXhkZHlQRVNuei06MTpjaQ',
        clientSecret: 'rMIqWIQ3aU0CKx9ExjBRrGfrUvhR5jCkbp4ilWtKGkd1Ty0gwz',
        redirectUri: `https://localhost:4000/auth/twitter`,
        code_verifier: '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA',
      });

      const twitterUser = await axios
        .get(
          `https://api.twitter.com/2/users/me?user.fields=id,name,profile_image_url,username`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Failed to fetch user`);
          throw new Error(error.message);
        });

      
      console.log('TWITTER_USER: ', twitterUser.data);
      const custmByTwitter = await this.customersService.findCustmByEmailOrName(
        twitterUser.data,
      );
      if (!custmByTwitter) {
        const phone: any = randomInt(380000000000, 990000000000);
        const newCustomer = await this.customersService.createCustomerByEmail(
          twitterUser.data,
          twitterUser.data.email ?? twitterUser.data.id,
          phone,
        );
        twitterUser.data.contract = newCustomer.contract;
      }
      twitterUser.data.contract = custmByTwitter.contract;
      const token = this.jwtService.sign(twitterUser);
      res.cookie('auth_twitter', token, {
        maxAge: 900000,
        httpOnly: true,
        secure: true,
      });
      res.redirect('https://localhost:3000');
    } catch (e) {
      throw new HttpException(`${e.message}`, HttpStatus.UNAUTHORIZED);
    }
  }

  async getCurrentTwitterUser(req: Request, res: Response, cookies: string) {
    console.log('get_CUSTOMER_TWITTER');
    try {
      //const getCoockies: string | undefined = req.cookies[name];
      console.log('GET_COOCKIES_TWITTER: ', cookies);
      if (cookies) {
        const decoded = this.jwtService.verify(cookies);
        console.log('decoded_TWITTER', decoded.data);
        return decoded.data;
      } else {
        console.log('Користувач TWITER не авторизован');
      }
    } catch (err) {
      console.log(err);
      res.send('No Data');
    }
  }
}
