* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f5f7;
  direction: rtl;
  color: #222;
}
header {
  background: #123b4a;
  color: white;
  padding: 22px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
header h1 {
  margin: 0;
  font-size: 28px;
}
header p {
  margin: 6px 0 0;
  opacity: 0.85;
}
main {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
  margin: auto;
  direction: ltr;
}
.menu,
.cart {
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}
.menu {
  flex: 2;
}
.cart {
  flex: 1;
  direction: rtl;
  min-width: 330px;
}
h2 {
  margin-top: 0;
}
/* نوع الطلب */
.order-type {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}
.order-type button {
  padding: 15px 10px;
  border: none;
  border-radius: 10px;
  background: #e8edf0;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.order-type button:hover {
  background: #d7e0e4;
}
/* التصنيفات */
.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.categories button {
  padding: 14px 10px;
  border: none;
  border-radius: 10px;
  background: #f0f2f3;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.categories button:hover {
  background: #dfe4e6;
}
/* الأصناف */
.items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;
}
.item {
  background: #f7f8f9;
  padding: 22px 10px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e2e5e7;
  transition: 0.15s;
}
.item:hover {
  transform: translateY(-2px);
  background: #eef2f4;
}
.item strong {
  font-size: 17px;
}
.price {
  margin-top: 9px;
  font-weight: bold;
  font-size: 16px;
}
/* معلومات الطلب */
.order-info {
  background: #f3f5f6;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
}
#orderType {
  margin-right: 5px;
}
/* عناصر السلة */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 12px;
  background: #f5f6f7;
  border-radius: 8px;
}
.quantity {
  display: flex;
  align-items: center;
  gap: 5px;
}
.quantity button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: #ddd;
  font-size: 18px;
  cursor: pointer;
}
.quantity button:hover {
  background: #ccc;
}
/* المجموع */
.total {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  padding: 15px;
  background: #eef4f6;
  border-radius: 10px;
}
/* بيانات الزبون */
input,
textarea {
  width: 100%;
  padding: 13px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial;
  font-size: 15px;
}
textarea {
  height: 75px;
  resize: vertical;
}
/* الأزرار */
.confirm,
.clear {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 9px;
  color: white;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
}
.confirm {
  background: #16803c;
}
.confirm:hover {
  background: #126c32;
}
.clear {
  background: #777;
}
.clear:hover {
  background: #666;
}
/* موبايل */
@media (max-width: 800px) {
  main {
    flex-direction: column;
    padding: 10px;
  }
  .cart {
    min-width: 0;
  }
  .items {
    grid-template-columns: repeat(2, 1fr);
  }
  .categories {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 450px) {
  header h1 {
    font-size: 23px;
  }
  .menu,
  .cart {
    padding: 14px;
  }
  .items {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .item {
    padding: 18px 5px;
  }
  .categories {
    grid-template-columns: repeat(2, 1fr);
  }
  .order-type {
    grid-template-columns: repeat(3, 1fr);
  }
  .order-type button {
    font-size: 13px;
    padding: 13px 5px;
  }
}
