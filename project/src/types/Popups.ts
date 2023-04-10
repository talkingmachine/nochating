
export type PasswordPlateInfo = {
  password: string;
  chatId: string;
  isOpen: boolean;
};
export type NewRoomInfo = {
  isOpen: boolean;
};
export type ContextMenuInfo = {
  isOpen: boolean;
  contextMenuType: string;
  contextMenuCoords: {
    x: number;
    y: number;
  };
  roomId: string;
  messageId: string;
  chatId: string;
};
export type WarningMessageInfo = {
  isOpen: boolean;
  title: string;
  description: string;
};
