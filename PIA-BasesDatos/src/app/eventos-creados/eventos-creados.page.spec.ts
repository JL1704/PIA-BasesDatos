import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventosCreadosPage } from './eventos-creados.page';

describe('EventosCreadosPage', () => {
  let component: EventosCreadosPage;
  let fixture: ComponentFixture<EventosCreadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosCreadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
