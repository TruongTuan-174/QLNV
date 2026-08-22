import { useEffect, useState } from 'react'
import employeeApi from './api/employeeApi'
import EmployeeTable from './components/EmployeeTable'
import EmployeeFormModal from './components/EmployeeFormModal'

function App() {
  const [employees, setEmployees] = useState([])
  const [keyword, setKeyword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null) // { type: 'success' | 'danger', message }

  const loadEmployees = async (searchKeyword = '') => {
    setLoading(true)
    try {
      const res = await employeeApi.getAll(searchKeyword)
      setEmployees(res.data)
    } catch (err) {
      showAlert('danger', 'Không thể tải danh sách nhân viên. Kiểm tra backend đã chạy chưa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  const showAlert = (type, message) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadEmployees(keyword)
  }

  const handleAddClick = () => {
    setEditingEmployee(null)
    setErrors(null)
    setShowModal(true)
  }

  const handleEditClick = (employee) => {
    setEditingEmployee(employee)
    setErrors(null)
    setShowModal(true)
  }

  const handleDelete = async (employee) => {
    if (!window.confirm(`Xóa nhân viên ${employee.fullName} (${employee.employeeCode})?`)) return
    try {
      await employeeApi.remove(employee.id)
      showAlert('success', 'Đã xóa nhân viên thành công')
      loadEmployees(keyword)
    } catch (err) {
      showAlert('danger', 'Xóa thất bại')
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await employeeApi.update(editingEmployee.id, formData)
        showAlert('success', 'Cập nhật nhân viên thành công')
      } else {
        await employeeApi.create(formData)
        showAlert('success', 'Thêm nhân viên thành công')
      }
      setShowModal(false)
      setErrors(null)
      loadEmployees(keyword)
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data.errors || {})
        if (err.response.data.message) {
          showAlert('danger', err.response.data.message)
        }
      } else {
        showAlert('danger', 'Có lỗi xảy ra, vui lòng thử lại')
      }
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Quản lý nhân viên</h2>

      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Tìm theo tên hoặc mã NV..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ minWidth: 260 }}
          />
          <button className="btn btn-outline-secondary" type="submit">
            Tìm kiếm
          </button>
        </form>

        <button className="btn btn-primary" onClick={handleAddClick}>
          + Thêm nhân viên
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Đang tải...</div>
      ) : (
        <EmployeeTable employees={employees} onEdit={handleEditClick} onDelete={handleDelete} />
      )}

      <EmployeeFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
        editingEmployee={editingEmployee}
        errors={errors}
      />
    </div>
  )
}

export default App
