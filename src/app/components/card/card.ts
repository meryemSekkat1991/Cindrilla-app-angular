import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() title!: string;
  @Input() description!: string;
  @Input() delay: string = '';

  cards = [
    { title: 'Commander un service', description: 'Choisissez un service et passez votre commande sans vous authentifier.', delay: '' },
    { title: 'Voir nos coiffeurs', description: 'Découvrez notre équipe de professionnels et leurs spécialités.', delay: 'delay-100' },
    { title: 'Promotions & nouveautés', description: 'Consultez nos offres spéciales et événements du mois.', delay: 'delay-200' },
  ];

}
