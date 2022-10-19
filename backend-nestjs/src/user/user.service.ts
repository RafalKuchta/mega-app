import {Inject, Injectable} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse} from "../interfaces/user";
import {User} from "./user.entity";
import {hashPwd} from "../utils/hash-pwd";
import {MailService} from "../mail/mail.service";
import {registeredNewUserInfo} from "../templates/email/registered-new-user-info";

@Injectable()
export class UserService {
    constructor(
      @Inject(MailService) private mailService: MailService,
    ) {}

  filter(user: User): RegisterUserResponse {
    const {id, email, roles} = user;
    return {id, email, roles:[]};
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
      const user = new User();
      user.email = newUser.email;
      user.pwdHash = hashPwd(newUser.pwd);

      // const findUserinBase = await User.findOne({where: {
      //         email: newUser.email,
      //     }});
      //
      // if (findUserinBase.email){
      //     throw new ConflictException(`Username: ${findUserinBase.email} is existed`)
      // }

          await user.save();

          await this.mailService.sendMail('r.kuchta@gba-polska.pl', 'Rejestracja użytkownika.', registeredNewUserInfo(user.email))

          return this.filter(user);

  }

  async getOneUser(id: string): Promise<User> {
      return await User.findOne({where: {id}});
  }

}