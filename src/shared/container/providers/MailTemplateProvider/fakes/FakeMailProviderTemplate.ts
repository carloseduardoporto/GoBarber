import IMailProviderTemplate from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailProviderTemplate {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
