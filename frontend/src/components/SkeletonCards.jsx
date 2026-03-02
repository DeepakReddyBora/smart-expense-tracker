export default function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 skeleton"></div>
      ))}
    </div>
  );
}