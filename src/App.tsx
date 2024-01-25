import { QueryClient, QueryClientProvider } from "react-query";
import Demo from "./Demo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Demo />
      </QueryClientProvider>
    </>
  );
};

export default App;
