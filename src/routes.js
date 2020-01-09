import CharacterSheet from './components/CharacterSheet';
import CharactersList from './components/CharactersList';

export default [
  { path: '/', name: 'characters-list', component: CharactersList},
  { path: '/list/:id', name: 'list-edit', component: CharacterSheet },
  { path: '/new-list', name: 'new-list', component: CharacterSheet },
]
