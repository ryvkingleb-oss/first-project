import { MessengerIcons } from "@/components/Messengers";
import { ContactForm } from "@/components/ContactForm";

type Props = {
  source?: string;
};

/** Блок «Связаться» для статей: мессенджеры сверху, форма заявки снизу. */
export function ArticleContact({ source }: Props) {
  return (
    <aside className="article-contact" aria-label="Связаться и оставить заявку">
      <h2>Связаться со мной</h2>
      <p className="muted">
        Напишите в мессенджер или оставьте заявку — отвечу с вопросами по задаче и ориентиром по срокам.
      </p>
      <MessengerIcons size="lg" className="article-contact-messengers" />
      <ContactForm compact source={source} />
    </aside>
  );
}
