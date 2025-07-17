import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowList } from './tv-show-list';

describe('TvShowList', () => {
  let component: TvShowList;
  let fixture: ComponentFixture<TvShowList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
