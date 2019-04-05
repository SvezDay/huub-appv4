import { TestBed, async, inject } from '@angular/core/testing';
import { RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class MockRouter {
    navigate(path){}
}


describe('AuthGuard', () => {
    let mockSnapshot: RouterStateSnapshot;
    beforeEach(()=>{
        mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    })
    describe('CanActivate', () => {
        let authGuard: AuthGuard;
        let authService;
        let router;

        it('should return true for a logged in user', ()=>{
            authService = { isLoggedIn: () => true };
            router = new MockRouter();
            authGuard = new AuthGuard(authService, router);

            expect(authGuard.canActivate(null, mockSnapshot)).toEqual(true);
        });

        xit('should navigate to home for a logged out user', ()=>{
            authService = { isLoggedIn: () => false };
            router = new MockRouter();
            authGuard = new AuthGuard(authService, router);
            spyOn(router, 'navigate');

            expect(authGuard.canActivate(null, mockSnapshot)).toEqual(false);
            expect(router.navigate).toHaveBeenCalledWith(['/public/home']);
        });
    });
});














// describe('AuthGuard', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthGuard]
//     });
//   });
//
//   it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
//     expect(guard).toBeTruthy();
//   }));
// });
