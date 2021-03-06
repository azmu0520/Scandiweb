import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cards, Wrap } from './style';
import { Link } from 'react-router-dom';

class All extends Component {
  componentDidMount() {
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        {   
          categories {
          name
          products {
                      id 
                      name 
                      inStock 
                      gallery  
                      description 
                      category   
                      attributes {
                                   id 
                                  name 
                                  type
                                  items {
                                        displayValue
                                        value
                                        id
                                        }
                                }
                      prices {
                              currency {
                                        label
                                        symbol
                                        }
                              amount
                              }
                      brand 
        
                    }
                    }
        }
    `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.dispatch({
          type: 'setData',
          payload: res?.data?.categories,
        });
      });
  }
  state = {
    path: this.props?.location?.pathname,
  };
  render() {
    let path = this.props?.location?.pathname?.substr(1);

    return (
      <Wrap>
        {this.props?.data ? (
          <>
            <Wrap.Title>Category name</Wrap.Title>
            {this?.state?.path === '/' ? (
              <Cards>
                {this.props?.data[0]?.products?.map((item) => (
                  <Cards.Each key={item?.id} opacity={String(item?.inStock)}>
                    <Link to={`${item?.category}/${item?.id}`}>
                      <Cards.Img
                        opacity={String(item?.inStock)}
                        src={item?.gallery[0]}
                      />
                    </Link>
                    <Cards.Title>{item?.name}</Cards.Title>
                    <Cards.Price>{item?.prices[0]?.amount}</Cards.Price>
                    <Wrap.Cart>
                      <Cards.Icon />
                    </Wrap.Cart>
                    <Cards.Stock opacity={String(item?.inStock)}>
                      OUT OF STOCK
                    </Cards.Stock>
                  </Cards.Each>
                ))}
              </Cards>
            ) : (
              <Cards>
                {this.props?.data
                  ?.filter((i) => i?.name === path)[0]
                  ?.products?.map((item) => (
                    <Cards.Each key={item?.id} opacity={String(item?.inStock)}>
                      <Link to={`${item?.category}/${item?.id}`}>
                        <Cards.Img
                          opacity={String(item?.inStock)}
                          src={item?.gallery[0]}
                        />
                      </Link>
                      <Cards.Title>{item?.name}</Cards.Title>
                      <Cards.Price>{item?.prices[0]?.amount}</Cards.Price>
                      <Wrap.Cart>
                        <Cards.Icon />
                      </Wrap.Cart>
                      <Cards.Stock opacity={String(item?.inStock)}>
                        OUT OF STOCK
                      </Cards.Stock>
                    </Cards.Each>
                  ))}
              </Cards>
            )}
          </>
        ) : (
          <div>NO DATA</div>
        )}
      </Wrap>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(All);
