import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryChannelService implements InMemoryDbService {
  createDb() {
    const channels = [
      { id: 1, name: 'Happy Room', description: 'Channel for Happy People' },
      { id: 2, name: 'Cheater Room', description: 'Channel for Cheater People' },
      { id: 3, name: 'Kids Room', description: 'Channel for Happy Kids' },
    ];

    return { channels };
  }
}
