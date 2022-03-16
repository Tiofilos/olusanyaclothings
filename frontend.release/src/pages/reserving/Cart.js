import { ListGroup, Button } from 'react-bootstrap';

export default function Cart({ cbPay, title, items, discounts }) {
  // This function adds all prices
  const calcSubTotal = () => items.map((item) => item.price).reduce((a, b) => a + b, 0);

  // This function returns the discounted money from a given percent.
  // This value must be [0 - 100]
  const calcDiscount = (percent) => {
    const subTotal = calcSubTotal();
    const discount = percent * subTotal / 100;
    console.log(percent, '=>', discount);
    return discount;
  }

  // This function calc the total
  const calcTotal = () => {
    const subTotal = calcSubTotal();
    const totalDiscount = discounts
      .map((discount) => calcDiscount(discount.percent))
      .reduce((a, b) => a + b, 0);
    console.log('total:', subTotal, 'discounted:', totalDiscount);
    return subTotal - totalDiscount;
  }

  return (
    <>
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-primary">{title || 'Cart'}</span>
      <span className="badge bg-info rounded-pill">{(items || []).length}</span>
    </h4>

    <ListGroup className="mb-3">
      {items.map((item, key) => {
        return (
          <ListGroup.Item key={key} className="d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">{item.title}</h6>
              <small className="text-muted">{item.description}</small>
            </div>
            <span className="text-muted">{item.price}</span>
          </ListGroup.Item>
        );
      })}

      {discounts.map((discount) => {
        return (
          <ListGroup.Item className="d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Special discount</h6>
                  <small>{discount.concept}</small>
                </div>
                <span className="text-success">−${calcDiscount(discount.percent)}</span>
          </ListGroup.Item>
        );
      })}

      <ListGroup.Item className="d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>${calcTotal()}</strong>
      </ListGroup.Item>
    </ListGroup>

    <div className="d-grid gap-2">
      <Button variant="success" size="lg" onClick={cbPay}>Pay</Button>
    </div>
    </>
  );
}