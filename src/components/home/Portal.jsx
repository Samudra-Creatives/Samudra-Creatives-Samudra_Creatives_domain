export default function Portal({ side = "left" }) {
  return (
    <div
      className={`portal portal--${side}`}
      aria-hidden="true"
    >
      <div className="portal__atmosphere" />

      <div className="portal__outer-glow" />

      <div className="portal__ring portal__ring--outer">
        <span />
      </div>

      <div className="portal__ring portal__ring--second">
        <span />
      </div>

      <div className="portal__ring portal__ring--third">
        <span />
      </div>

      <div className="portal__ring portal__ring--energy">
        <span />
      </div>

      <div className="portal__body">
        <div className="portal__tunnel">
          <div className="portal__tunnel-glow" />

          <div className="portal__core">
            <div className="portal__core-light" />
          </div>
        </div>
      </div>

      <div className="portal__particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}