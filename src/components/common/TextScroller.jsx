import { announcementItems } from "../../data/announcement";

export default function TextScroller() {
  /*
   * Duplicate the list so the animation can
   * continuously move without a visible jump.
   */
  const items = [
    ...announcementItems,
    ...announcementItems,
  ];

  return (
    <section
      className="text-scroller"
      aria-label="Samudra Creatives services"
    >
      <div className="text-scroller__track">
        {items.map((item, index) => (
          <div
            className="text-scroller__item"
            key={`${item}-${index}`}
          >
            <span className="text-scroller__dot">
              ✦
            </span>

            <span className="text-scroller__text">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}