const mapping: Record<string, string> = {
  accounts: 'account',
  'data-sources': 'data_source',
  flashcards: 'flashcard',
  'flashcard-decks': 'flashcard_deck',
  'group-members': 'group_member',
  'learning-groups': 'learning_group',
  'learning-schedules': 'learning_schedule',
  users: 'user',
  'user-progresses': 'user_progress',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
