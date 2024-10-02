import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Validação criação de company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Criando company', () => {
    it(`Deve retornar status criado: ${StatusCodes.CREATED}`, async () => {
      const userData = {
        name:   "Acme Corp",               
        cnpj:   "12.345.678/0001-95",      
        state:   "SC",                      
        city:   "Criciúma",               
        address:   "Rua Luiz Gonzaga Cavanholi, 65", 
        sector:   "Tecnologia"              
      };

      await p
        .spec()
        .post(`${baseUrl}/users`)
        .withJson(userData)
        .expectStatus(StatusCodes.CREATED);
    });
  });
});

describe('Validação recuperação de companys', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Recuperando companys', () => {
    it(`Deve retornar status Ok: ${StatusCodes.OK}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([]);
    });
  });
});

describe('Validação deleção de company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const userId = 23; 

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Deletando company por Id', () => {
    it(`Deve retornar status No Content: ${StatusCodes.NO_CONTENT}`, async () => {
      await p
        .spec()
        .delete(`${baseUrl}/company/${userId}`)
        .expectStatus(StatusCodes.NO_CONTENT); 
    });

    it(`Deve retornar status Not Found após deletar: ${StatusCodes.NOT_FOUND}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${userId}`)
        .expectStatus(StatusCodes.NOT_FOUND); // 404 Not Found
    });
  });
});

describe('Validação recuperação de company por Id', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const userId = 23;

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Recuperando company por Id', () => {
    it(`Deve retornar status Ok: ${StatusCodes.OK}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${userId}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          address: expect.any(String),
          city: expect.any(String),
          cnpj: expect.any(String),
          id: expect.any(Number),
          name: expect.any(String),
          sector: expect.any(String),
          state: expect.any(String),
        });
    });
  });
});

describe('Validação recuperação de employees da company por Id', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const companyId = 45;
  const employeeId = 51;

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Recuperando employees da company por Id', () => {
    it(`Deve retornar status Ok: ${StatusCodes.OK}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/employees/${employeeId}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          employeeId: expect.any(Number),
          name: expect.any(String),
          position: expect.any(String),
          email: expect.any(String),
        });
    });
  });
});

describe('Validação deleção de produto da company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  const companyId = 23;
  const productId = 65;

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Deletando produto da company por Id', () => {
    it(`Deve retornar status No Content: ${StatusCodes.NO_CONTENT}`, async () => {
      await p
        .spec()
        .delete(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NO_CONTENT);
    });

    it(`Deve retornar status Not Found após deletar: ${StatusCodes.NOT_FOUND}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });
});

describe('Validação deleção de produto da company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  
  p.request.setDefaultTimeout(30000);
  
  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());
  
  describe('Adicionando funcionário à empresa', () => {
    const companyId = 23;
    const employeeData = {
      name: 'Novo Funcionário',
      email: 'novo.funcionario@example.com',
      position: 'Tester'
    };
  
    it(`Deve retornar status Created: ${StatusCodes.CREATED}`, async () => {
      const response = await p
        .spec()
        .post(`${baseUrl}/company/${companyId}/employees`)
        .withBody(employeeData)
        .expectStatus(StatusCodes.CREATED);
  
      const employeeId = response.body.id;
      console.log(`Funcionário criado com o ID ${employeeId}`);
    });
  });
});

describe('Validação recuperação de services', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Recuperando services', () => {
    const companyId = 23;

    it(`Deve retornar status Ok: ${StatusCodes.OK}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/services`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([]);
    });
  });
});

describe('Validação recuperação de products', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Recuperando products', () => {
    const companyId = 23;

    it(`Deve retornar status Ok: ${StatusCodes.OK}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/products`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([]);
    });
  });
});

describe('Validação criação de produto da company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  
  p.request.setDefaultTimeout(30000);
  
  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());
  
  describe('Criando produto da empresa', () => {
    const companyId = 23;
    const productData = {
      productName: 'Novo Produto',
      productDescription: 'Descrição do novo produto',
      price: 99.99
    };
  
    it(`Deve retornar status Created: ${StatusCodes.CREATED}`, async () => {
      const response = await p
        .spec()
        .post(`${baseUrl}/company/${companyId}/products`)
        .withBody(productData)
        .expectStatus(StatusCodes.CREATED);
  
      const productId = response.body.id;
      console.log(`Produto criado com o ID ${productId}`);
    });
  });
});

describe('Validação deleção de produto da company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  
  p.request.setDefaultTimeout(30000);
  
  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());
  
  describe('Deletando produto da empresa', () => {
    const companyId = 23;
    const productId = 65;
  
    it(`Deve retornar status No Content: ${StatusCodes.NO_CONTENT}`, async () => {
      await p
        .spec()
        .delete(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NO_CONTENT);
    });
  
    it(`Deve retornar status Not Found após deletar: ${StatusCodes.NOT_FOUND}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });
});

describe('Validação deleção de produto da company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  
  p.request.setDefaultTimeout(30000);
  
  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());
  
  describe('Deletando produto da empresa', () => {
    const companyId = 23;
    const productId = 65;
  
    it(`Deve retornar status No Content: ${StatusCodes.NO_CONTENT}`, async () => {
      await p
        .spec()
        .delete(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NO_CONTENT);
    });
  
    it(`Deve retornar status Not Found após deletar: ${StatusCodes.NOT_FOUND}`, async () => {
      await p
        .spec()
        .get(`${baseUrl}/company/${companyId}/products/${productId}`)
        .expectStatus(StatusCodes.NOT_FOUND);
    });
  });
});