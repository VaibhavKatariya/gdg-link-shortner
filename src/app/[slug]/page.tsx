
interface PageProps {
  params: {
    slug: string;
  };
}

export default function SlugPage({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Slug: {slug}</h1>
    </div>
  );
}