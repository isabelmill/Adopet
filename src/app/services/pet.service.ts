import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { PetFilter } from '../models/pet-filter.model';
import { UtilService } from '../utilservice/utils.service';

@Injectable({
    providedIn: 'root'
})

export class PetService {

    constructor(private http: HttpClient, private UtilService: UtilService) { }

    KEY = 'pets';
    DONATION_KEY = 'donated';
    
    public donatedAmount: number = this.UtilService.load(this.DONATION_KEY) || 0

    private _petsDb: Pet[] = this.UtilService.load(this.KEY) || this.UtilService.store(this.KEY, [
        { _id: 'p101', name: 'Erica', age: 4, birthDate: new Date('2017-11-08'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/04/erika-360x360.jpg', sex: 'female', size: 'medium', color: 'Brown and White', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p102', name: 'Punch', age: 1, birthDate: new Date('2021-02-02'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/04/unch81-360x360.jpg', sex: 'male', size: 'medium', color: 'Brown and White', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p103', name: 'Michaela', age: 6, birthDate: new Date('2016-04-04'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/04/michaela7-360x360.jpg', sex: 'female', size: 'medium', color: 'Black and White', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p104', name: 'Bamba', age: 1, birthDate: new Date('2021-04-06'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/04/bamba2-360x360.jpg', sex: 'female', size: 'medium', color: 'Brown', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p105', name: 'Andres', age: 1, birthDate: new Date('2013-01-28'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/02/andrw-360x360.jpg', sex: 'male', size: 'medium', color: 'Black - White', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p106', name: 'Susu', age: 2, birthDate: new Date('2020-05-07'), url: 'https://www.letlive.org.il/wp-content/uploads/2021/10/susu-360x360.jpg', sex: 'male', size: 'large', color: 'Brown - Black - White', type: 'dog', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p107', name: 'Gal', age: 3, birthDate: new Date('2019-01-15'), url: 'https://www.letlive.org.il/wp-content/uploads/2022/01/naf11-360x360.jpg', sex: 'male', size: 'small', color: 'Brown / Chocolate, Black', type: 'cat', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p108', name: 'Eilon', age: 10, birthDate: new Date('2011-12-11'), url: 'https://www.letlive.org.il/wp-content/uploads/2021/02/avanesa-340x360.jpg', sex: 'male', size: 'small', color: 'White - Black', type: 'cat', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p109', name: 'Nafnaf', age: 1, birthDate: new Date('2020-02-09'), url: 'https://www.letlive.org.il/wp-content/uploads/2021/01/gal-287x360.jpeg', sex: 'female', size: 'small', color: 'White', type: 'cat', location: 'Tel-Aviv', isLiked: false },
        { _id: 'p110', name: 'Sushi', age: 1, birthDate: new Date('2021-09-14'), url: 'https://www.letlive.org.il/wp-content/uploads/2021/03/kit99-301x360.jpeg', sex: 'male', size: 'small', color: 'Black', type: 'cat', location: 'Tel-Aviv', isLiked: false },
    ]);

    private _pets$ = new BehaviorSubject<Pet[]>([]);
    public pets$ = this._pets$.asObservable()

    private _filterBy$ = new BehaviorSubject<PetFilter>({ term: '', type: 'dog', gender: '', size: '', age: '' });
    public filterBy$ = this._filterBy$.asObservable()

    public query() {
        const filterBy = this._filterBy$.getValue()
        if (this._petsDb) {
            const pets = this._petsDb.filter(({ name, sex, type, size }) => {
                return name.toLowerCase().includes(filterBy.term.toLowerCase()) && sex === filterBy.gender && type === filterBy.type && size === filterBy.size;
            });
            this._pets$.next(pets);

            if (filterBy.gender === '' && filterBy.size === '') {
                const pets = this._petsDb.filter(({ name, type }) => {
                    return name.toLowerCase().includes(filterBy.term.toLowerCase()) && type === filterBy.type
                });
                return this._pets$.next(pets);
            }

            if (filterBy.size === '' && filterBy.gender !== '') {
                const pets = this._petsDb.filter(({ name, type, sex }) => {
                    return name.toLowerCase().includes(filterBy.term.toLowerCase()) && type === filterBy.type && sex === filterBy.gender;
                });
                return this._pets$.next(pets);
            }

            if (filterBy.size !== '' && filterBy.gender === '') {
                const pets = this._petsDb.filter(({ name, type, size }) => {
                    return name.toLowerCase().includes(filterBy.term.toLowerCase()) && type === filterBy.type && size === filterBy.size;
                });
                return this._pets$.next(pets);
            }

            // if (filterBy.age !== '') {
            //     const pets = this._petsDb.filter(({ name, type, size , age  }) => {
            //         return name.toLowerCase().includes(filterBy.term.toLowerCase()) && type === filterBy.type && size === filterBy.size && ;
            //     });
            //     return this._pets$.next(pets);
            // }

        }

    }

    public shouldAdoptPet() {
        return this.http.get<{ answer: string }>('https://yesno.wtf/api')
            .pipe(
                map(res => res.answer)
            )
    }


    public getEmptyPet() {
        return { name: '', age: 0, birthDate: new Date() }
    }

    public remove(petId: string) {
        const pets = this._petsDb
        const petIdx = pets.findIndex(pet => pet._id === petId)
        pets.splice(petIdx, 1)
        this._pets$.next(pets);
        this.UtilService.store(this.KEY, pets);
        return of({})
    }

    public getById(petId: string): Observable<Pet> {
        const pet = this._petsDb.find(pet => pet._id === petId)
        return of({ ...pet })
    }

    public setFilterBy(filterBy: PetFilter) {
        this._filterBy$.next({ ...filterBy })
        this.query()
    }


    public save(pet: Pet) {
        return pet._id ? this._edit(pet) : this._add(pet)
    }

    public donate(donation: number) {
        this.donatedAmount += donation
        console.log(this.donatedAmount);
        this.UtilService.store(this.DONATION_KEY, this.donatedAmount)
    }

    private _add(pet: Pet) {
        const pets = this._petsDb
        pet._id = this._makeId()
        this._petsDb.push(pet)
        this._pets$.next(this._petsDb)
        this.UtilService.store(this.KEY, pets);
        return of(pet)
    }

    private _edit(pet: Pet) {
        const pets = this._petsDb
        const petIdx = pets.findIndex(_pet => _pet._id === pet._id)
        pets.splice(petIdx, 1, pet)
        // this._pets$.next(pets)
        this.UtilService.store(this.KEY, pets);
        return of(pet)
    }

    private _makeId(length = 5) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
