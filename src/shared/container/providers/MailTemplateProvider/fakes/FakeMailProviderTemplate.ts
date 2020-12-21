import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailProviderTemplate from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailProviderTemplate {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
