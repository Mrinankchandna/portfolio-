import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class ProjectsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setupProjectFilters();
  }

  setupProjectFilters(): void {
    // Add filtering functionality after view is initialized
    setTimeout(() => {
      const filterButtons = document.querySelectorAll('.btn-filter');
      const projectCards = document.querySelectorAll('.project-card');

      filterButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;

          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove('active'));

          // Add active class to clicked button
          target.classList.add('active');

          // Get filter value
          const filter = target.getAttribute('data-filter');

          // Filter projects
          projectCards.forEach((card) => {
            if (filter === 'all' || card.classList.contains(filter!)) {
              (card as HTMLElement).style.display = 'block';
            } else {
              (card as HTMLElement).style.display = 'none';
            }
          });
        });
      });
    }, 500);
  }
}
