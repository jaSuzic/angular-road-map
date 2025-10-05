import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-development',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-development.component.html',
  styleUrls: ['./api-development.component.scss']
})
export class ApiDevelopmentComponent {
  activeTab = 0;
  codeTabs = ['REST Example', 'GraphQL Example'];
  
  restExample = `@Injectable({ providedIn: 'root' })
export class BooksRestApi {
  constructor(private http: HttpClient) {}
  
  getBook(id: string) { 
    return this.http.get<Book>(\`/api/books/\${id}\`); 
  }
  
  listByAuthor(authorId: string) { 
    return this.http.get<Book[]>(\`/api/authors/\${authorId}/books\`); 
  }
}`;

  graphqlExample = `// books.gql.ts
import { gql } from 'apollo-angular';

export const BOOK_WITH_AUTHOR = gql\`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      pages
      author { 
        id 
        name 
      }
    }
  }
\`;

// books.service.ts
@Injectable({ providedIn: 'root' })
export class BooksGqlService {
  constructor(private apollo: Apollo) {}

  book(id: string) {
    return this.apollo.watchQuery<{ book: Book }>({
      query: BOOK_WITH_AUTHOR,
      variables: { id }
    }).valueChanges.pipe(map(r => r.data.book));
  }
}`;
}
