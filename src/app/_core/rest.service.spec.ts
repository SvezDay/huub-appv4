import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RestService } from './rest.service';

describe('RestService', () => {
    let injector: TestBed;
    let service: RestService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RestService]
        });
        injector = getTestBed();
        service = injector.get(RestService);
        httpMock = injector.get(HttpTestingController);
    });
    afterEach(()=>{
        httpMock.verify();
    });

    describe('Do something to test',()=>{
        it('should be created', () => {
            // const service: RestService = TestBed.get(RestService);
            // const service  = new RestService(HttpClient);
            expect(service).toBeTruthy();
        });
    })

});
