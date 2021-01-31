import { environment } from '../../environments/environment';

export default class Api {

    public static get baseURL(): string {
      return environment.services.api.baseURL
    }

}
