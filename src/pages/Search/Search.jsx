import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get('search');
    if (newQuery) {
      setSearchParams({ q: newQuery });
    }
  };

  // Mock results for demonstration
  const results = [
    { id: 1, title: 'Project Alpha', category: 'Project', description: 'Development of the new alpha platform.' },
    { id: 2, title: 'Meeting Sarah', category: 'Task', description: 'Monthly sync with Sarah regarding KPIs.' },
    { id: 3, title: 'Network Config', category: 'Settings', description: 'Updated network configuration for the OS.' },
    { id: 4, title: 'Q1 Performance', category: 'KPI', description: 'Reviewing Q1 performance metrics.' },
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Search Results</h2>
        <p className="text-muted">Showing results for "{query}"</p>
      </div>

      <Row className="mb-4 d-lg-none">
        <Col>
          <Form onSubmit={handleSearch}>
            <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
              <InputGroup.Text className="bg-white border-0 ps-3">
                <i className="bi bi-search text-muted"></i>
              </InputGroup.Text>
              <Form.Control
                name="search"
                defaultValue={query}
                placeholder="Search anything..."
                className="border-0 py-2 shadow-none"
              />
              <button type="submit" className="btn btn-primary px-4 bg-gradient" style={{ backgroundColor: '#40878E', borderColor: '#40878E' }}>
                Search
              </button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row className="g-4">
        {results.length > 0 ? (
          results.map((result) => (
            <Col key={result.id} xs={12}>
              <Card className="border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge bg-light text-primary mb-2 px-3 py-2 rounded-pill" style={{ color: '#40878E !important', backgroundColor: 'rgba(64, 135, 142, 0.1) !important' }}>
                        {result.category}
                      </span>
                      <h4 className="fw-bold text-dark mb-1">{result.title}</h4>
                    </div>
                    <button className="btn btn-outline-light border-0 text-muted">
                      <i className="bi bi-arrow-right fs-4"></i>
                    </button>
                  </div>
                  <Card.Text className="text-muted mb-0">
                    {result.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-search-heart text-muted opacity-25" style={{ fontSize: '5rem' }}></i>
            </div>
            <h3 className="text-dark fw-bold">No results found</h3>
            <p className="text-muted">Try searching with different keywords or categories.</p>
          </Col>
        )}
      </Row>

      <style dangerouslySetInnerHTML={{ __html: `
        .badge {
          font-weight: 500;
          font-size: 0.8rem;
        }
        .card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #f1f5f9 !important;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
        }
      `}} />
    </Container>
  );
};

export default Search;
