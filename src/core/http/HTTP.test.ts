import { expect } from 'chai';
import HTTP from './HTTP';
import sinon from 'sinon';

describe('HTTP class', () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    // Создаем фейковый объект XMLHttpRequest
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    sinon.restore(); // Восстанавливаем все заглушки после каждого теста
  });

  it('should make a GET request', async () => {
    const http = new HTTP();
    const responsePromise = http.get('/endpoint');

    // Получаем первый созданный запрос
    const request = requests[0];
    // expect(request).to.exist;

    // Создаем фейковый ответ
    const fakeResponse = JSON.stringify({ status: 200 });
    request.respond(200, { 'Content-Type': 'application/json' }, fakeResponse);

    const response = await responsePromise;
    expect(response).to.exist;
    expect(response.status).to.equal(200);
  });

  it('should initialize with a default path', () => {
    const http = new HTTP();
    expect(http._path).to.equal('');
  });

  it('should initialize with a specified path', () => {
    const path = '/test';
    const http = new HTTP(path);
    expect(http._path).to.equal(path);
  });
});
