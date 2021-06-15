import { ConfigurationInterface } from "../interface/configuration-interface";

export class AddConfiguration {
  static readonly type = 'Add Configuration';
  constructor(public config: ConfigurationInterface) {}
}
