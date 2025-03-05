import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://jk.janajaya.lk/products").then((res) => res.json()),
  });

  console.log(data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const { products } = data || {};
  return (
    <div>
      <ul>
        {products?.map((d) => (
          <p key={d.ProductID}>{JSON.parse(d.Name).si}</p>
        ))}
      </ul>
    </div>
  );
}
