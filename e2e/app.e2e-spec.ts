import { CodestompPage } from './app.po';

describe('codestomp App', () => {
  let page: CodestompPage;

  beforeEach(() => {
    page = new CodestompPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
