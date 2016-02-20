describe('Protractor demo', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should loade page', () => {
    expect(browser.getTitle()).toEqual('Title');
  });
});
