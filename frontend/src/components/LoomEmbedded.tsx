type LoomEmbedProps = {
  src: string;
};

export default function LoomEmbed({ src }: LoomEmbedProps) {
  return (
    <div className="loom-container">
      <iframe
        src={src}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        className="loom-iframe w-full h-full "
      />
    </div>
  );
}
