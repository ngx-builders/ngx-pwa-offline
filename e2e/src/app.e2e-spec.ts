import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    const text = await page.getParagraphText();
    expect(text).toEqual('Welcome to ngx-pwa-offline!');
  });
});
