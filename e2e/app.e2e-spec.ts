import { LeadsComputePage } from './app.po';

describe('leads-compute App', () => {
  let page: LeadsComputePage;

  beforeEach(() => {
    page = new LeadsComputePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
