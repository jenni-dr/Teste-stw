
import { CardDasbord } from "./components/Cards";
import { SearchForm } from "./components/SearchForm";
import { Produtos } from "./components/Table";
import { Container, DashboardContainer } from "./styles";

import { Top10Chart } from "./components/ChartCards/Top10";
import { Layout } from "../../Layout";

export function Dashboard() {
  return (
    <Layout containerStyle={{ backgroundColor: '#EFF7ED' }}>
      <Container>
        <DashboardContainer>
          <SearchForm />
          <div style={{ height: '30px' }}></div>
          <Top10Chart />
          <CardDasbord />
          <Produtos />
          <div style={{ height: '30px' }}></div>
        </DashboardContainer>
      </Container>
    </Layout>
  )
}
