import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const continents = [
  {
    continent: '아시아',
    countries: ['대한민국', '일본', '중국'],
  },
  {
    continent: '유럽',
    countries: ['독일', '프랑스', '영국'],
  },
  {
    continent: '북미',
    countries: ['미국', '캐나다', '멕시코'],
  },
];

const CustomAccordion = styled(Accordion)({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
});

const CustomAccordionSummary = styled(AccordionSummary)({
  boxShadow: 'none',
});

const Countries = ({ onCountrySelect, activeInput }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (continent) => (event, isExpanded) => {
    event.stopPropagation();
    setExpanded(isExpanded ? continent : false);
  };

  const handleCountryClick = (country, event) => {
    event.stopPropagation();
    onCountrySelect(country);
    setExpanded(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {activeInput === 'departure' ? '출발지 선택' : '도착지 선택'}
      </div>
      {continents.map((continent) => (
        <CustomAccordion
          key={continent.continent}
          expanded={expanded === continent.continent}
          onChange={handleChange(continent.continent)}
        >
          <CustomAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${continent.continent}-content`}
            id={`${continent.continent}-header`}
          >
            {continent.continent}
          </CustomAccordionSummary>
          <AccordionDetails>
            {continent.countries.map((country) => (
              <Button
                key={country}
                onClick={(event) => handleCountryClick(country, event)}
              >
                {country}
              </Button>
            ))}
          </AccordionDetails>
        </CustomAccordion>
      ))}
    </div>
  );
};

export default Countries;
