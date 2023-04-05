import { RoomInfoDocumentData } from '../types/DocumentData';

export const roomsFilter = (list: RoomInfoDocumentData[], word: string) => (
  list.filter((room) => room.title.toLowerCase().indexOf(word.toLowerCase()) !== -1)
);
