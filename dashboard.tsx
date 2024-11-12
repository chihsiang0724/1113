import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, ShoppingCart, Truck, DollarSign } from 'lucide-react'

// 定義類型
type Brand = {
  id: number;
  name: string;
}

type Product = {
  id: number;
  name: string;
  brand: string;
  stock: number;
  safetyStock: number;
}

type Order = {
  id: number;
  productName: string;
  brand: string;
  type: '進貨' | '出貨';
  quantity: number;
  date: string;
}

export default function App() {
  // 狀態
  const [currentPage, setCurrentPage] = useState<'home' | 'brands' | 'inventory' | 'orders'>('home')
  const [brands, setBrands] = useState<Brand[]>([
    { id: 1, name: '品牌A' },
    { id: 2, name: '品牌B' },
    { id: 3, name: '品牌C' },
  ])
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '商品1', brand: '品牌A', stock: 100, safetyStock: 20 },
    { id: 2, name: '商品2', brand: '品牌B', stock: 150, safetyStock: 30 },
    { id: 3, name: '商品3', brand: '品牌C', stock: 80, safetyStock: 15 },
  ])
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, productName: '商品1', brand: '品牌A', type: '進貨', quantity: 50, date: '2023-05-01' },
    { id: 2, productName: '商品2', brand: '品牌B', type: '出貨', quantity: 30, date: '2023-05-02' },
    { id: 3, productName: '商品3', brand: '品牌C', type: '進貨', quantity: 100, date: '2023-05-03' },
  ])

  // 新增品牌
  const [newBrandName, setNewBrandName] = useState('')
  const addBrand = () => {
    if (newBrandName) {
      setBrands([...brands, { id: brands.length + 1, name: newBrandName }])
      setNewBrandName('')
    }
  }

  // 新增商品
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', brand: '', stock: 0, safetyStock: 0 })
  const addProduct = () => {
    if (newProduct.name && newProduct.brand) {
      setProducts([...products, { id: products.length + 1, ...newProduct }])
      setNewProduct({ name: '', brand: '', stock: 0, safetyStock: 0 })
    }
  }

  // 更新庫存
  const updateInventory = (id: number, field: 'stock' | 'safetyStock', value: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    ))
  }

  // 新增訂單
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id' | 'date'>>({ productName: '', brand: '', type: '進貨', quantity: 0 })
  const addOrder = () => {
    if (newOrder.productName && newOrder.brand && newOrder.quantity) {
      setOrders([...orders, { 
        id: orders.length + 1, 
        ...newOrder, 
        date: new Date().toISOString().split('T')[0] 
      }])
      setNewOrder({ productName: '', brand: '', type: '進貨', quantity: 0 })
    }
  }

  // 首頁
  const HomePage = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">總品牌數</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{brands.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">總商品數</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">庫存不足商品</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products.filter(p => p.stock <= p.safetyStock).length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">總訂單數</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orders.length}</div>
        </CardContent>
      </Card>
    </div>
  )

  // 品牌&商品管理
  const BrandProductManagement = () => (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>品牌管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="輸入新品牌名稱"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addBrand}>添加品牌</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>品牌名稱</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>商品管理</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 space-x-2">
            <Input
              type="text"
              placeholder="商品名稱"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Select onValueChange={(value) => setNewProduct({ ...newProduct, brand: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選擇品牌" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="初始庫存"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="安全庫存"
              value={newProduct.safetyStock}
              onChange={(e) => setNewProduct({ ...newProduct, safetyStock: parseInt(e.target.value) })}
            />
            <Button onClick={addProduct}>添加商品</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>商品名稱</TableHead>
                <TableHead>品牌</TableHead>
                <TableHead>當前庫存</TableHead>
                <TableHead>安全庫存</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.safetyStock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  // 庫存管理
  const InventoryManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>庫存管理</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>商品名稱</TableHead>
              <TableHead>品牌</TableHead>
              <TableHead>當前庫存</TableHead>
              <TableHead>安全庫存</TableHead>
              <TableHead>庫存狀態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => updateInventory(product.id, 'stock', parseInt(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.safetyStock}
                    onChange={(e) => updateInventory(product.id, 'safetyStock', parseInt(e.target.value))}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  {product.stock > product.safetyStock ? (
                    <span className="text-green-500">正常</span>
                  ) : (
                    <span className="text-red-500">庫存不足</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  // 訂單管理
  const OrderManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>訂單管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 space-x-2">
          <Input
            type="text"
            placeholder="商品名稱"
            value={newOrder.productName}
            onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
          />
          <Select onValueChange={(value) => setNewOrder({ ...newOrder, brand: value })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="選擇品牌" />
            </SelectTrigger>
            <SelectContent>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setNewOrder({ ...newOrder, type: value as '進貨' | '出貨' })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="訂單類型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="進貨">進貨</SelectItem>
              <SelectItem value="出貨">出貨</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="數量"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          />
          <Button onClick={addOrder}>添加訂單</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>商品名稱</TableHead>
              <TableHead>品牌</TableHead>
              <TableHead>類型</TableHead>
              <TableHead>數量</TableHead>
              <TableHead>日期</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.brand}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">多品牌商品管理系統</h1>
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setCurrentPage('home')}>首頁</Button>
        <Button onClick={() => setCurrentPage('brands')}>品牌&商品管理</Button>
        <Button onClick={() => setCurrentPage('inventory')}>庫存管理</Button>
        <Button onClick={() => setCurrentPage('orders')}>訂單管理</Button>
      </div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'brands' && <BrandProductManagement />}
      {currentPage === 'inventory' && <InventoryManagement />}
      {currentPage === 'orders' && <OrderManagement />}
    </div>
  )
}
