import { TriangularPage } from './app.po';

describe('triangular App', function() {
  let page: TriangularPage;

  beforeEach(() => {
    page = new TriangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
