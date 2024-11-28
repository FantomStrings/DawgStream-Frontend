import DeleteIcon from '@mui/icons-material/Delete';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import { IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

// project import
import { IMessage } from 'types/message';
import { IBook } from 'types/book';
import PriorityAvatar from 'components/Priority';

export function MessageListItem({ message, onDelete }: { message: IMessage; onDelete: (name: string) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(message.name)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <PriorityAvatar priority={message.priority} />
      </ListItemAvatar>
      <ListItemText primary={message.message} secondary={message.name} secondaryTypographyProps={{ color: 'gray' }} />
    </ListItem>
  );
}
export function BookListItem({ book, onDelete }: { book: IBook; onDelete: (isbn13: number) => void }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(book.isbn13)}>
          <DeleteIcon />
        </IconButton>
      }
    >
    </ListItem>
  );
}
export function NoMessage() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No Elements" />
    </ListItem>
  );
}
export function NoBooks() {
  return (
    <ListItem>
      <ListItemAvatar>
        <CommentsDisabledIcon />
      </ListItemAvatar>
      <ListItemText primary="No Books" />
    </ListItem>
  );
}
