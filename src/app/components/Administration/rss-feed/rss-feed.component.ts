import { Component } from '@angular/core';

interface Feed {
  title: string;
  url: string;
}

@Component({
  selector: 'app-rss-feeds',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})
export class RssFeedComponent {
  feedURL: string = '';
  feedTitle: string = '';
  message: string = '';
  feeds: Feed[] = [];

  addFeed(): void {
    const url = this.feedURL.trim();
    const title = this.feedTitle.trim();

    if (!url || !title) return;

    this.feeds.push({ title, url });
    this.message = '✅ RSS Feed added!';

    // Reset form fields
    this.feedURL = '';
    this.feedTitle = '';

    setTimeout(() => {
      this.message = '';
    }, 2000);
  }
}
