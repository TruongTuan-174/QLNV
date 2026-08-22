import { useEffect, useState } from 'react'
import departmentApi from '../api/departmentApi'
import positionApi from '../api/positionApi'

const emptyForm = {
  fullName: '',
  dateOfBirth: '',
  gender: 'Nam',
  email: '',
  phone: '',
  address: '',
  departmentId: '',
  positionId: '',
  salary: '',
}

export default function EmployeeFormModal({ show, onClose, onSubmit, editingEmployee, errors }) {
  const [form, setForm] = useState(emptyForm)
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])

  // Thêm nhanh phòng ban
  const [showAddDept, setShowAddDept] = useState(false)
  const [newDeptName, setNewDeptName] = useState('')
  const [newDeptCode, setNewDeptCode] = useState('')
  const [deptError, setDeptError] = useState('')

  // Thêm nhanh chức vụ
  const [showAddPos, setShowAddPos] = useState(false)
  const [newPosName, setNewPosName] = useState('')
  const [posError, setPosError] = useState('')

  const loadDepartments = async () => {
    const res = await departmentApi.getAll()
    setDepartments(res.data)
    return res.data
  }

  const loadPositions = async () => {
    const res = await positionApi.getAll()
    setPositions(res.data)
    return res.data
  }

  useEffect(() => {
    if (!show) return
    loadDepartments()
    loadPositions()
  }, [show])

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        fullName: editingEmployee.fullName || '',
        dateOfBirth: editingEmployee.dateOfBirth || '',
        gender: editingEmployee.gender || 'Nam',
        email: editingEmployee.email || '',
        phone: editingEmployee.phone || '',
        address: editingEmployee.address || '',
        departmentId: editingEmployee.department?.id ?? '',
        positionId: editingEmployee.position?.id ?? '',
        salary: editingEmployee.salary ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [editingEmployee, show])

  if (!show) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      departmentId: form.departmentId ? Number(form.departmentId) : null,
      positionId: form.positionId ? Number(form.positionId) : null,
      salary: form.salary === '' ? null : Number(form.salary),
    })
  }

  const handleAddDepartment = async (e) => {
    e.preventDefault()
    setDeptError('')
    try {
      const res = await departmentApi.create({ name: newDeptName, code: newDeptCode })
      await loadDepartments()
      setForm((prev) => ({ ...prev, departmentId: res.data.id }))
      setShowAddDept(false)
      setNewDeptName('')
      setNewDeptCode('')
    } catch (err) {
      setDeptError(err.response?.data?.message || 'Không thêm được phòng ban')
    }
  }

  const handleAddPosition = async (e) => {
    e.preventDefault()
    setPosError('')
    try {
      const res = await positionApi.create({ name: newPosName })
      await loadPositions()
      setForm((prev) => ({ ...prev, positionId: res.data.id }))
      setShowAddPos(false)
      setNewPosName('')
    } catch (err) {
      setPosError(err.response?.data?.message || 'Không thêm được chức vụ')
    }
  }

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingEmployee ? `Sửa nhân viên - ${editingEmployee.employeeCode}` : 'Thêm nhân viên mới'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Họ tên *</label>
                  <input
                    type="text"
                    className={`form-control ${errors?.fullName ? 'is-invalid' : ''}`}
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors?.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                </div>

                <div className="col-md-3">
                  <label className="form-label">Ngày sinh</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Giới tính</label>
                  <select className="form-select" name="gender" value={form.gender} onChange={handleChange}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors?.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors?.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Phòng ban - dropdown + thêm nhanh */}
                <div className="col-md-6">
                  <label className="form-label">Phòng ban *</label>
                  <div className="d-flex gap-2">
                    <select
                      className={`form-select ${errors?.departmentId ? 'is-invalid' : ''}`}
                      name="departmentId"
                      value={form.departmentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn phòng ban --</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.code})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowAddDept((v) => !v)}
                      title="Thêm phòng ban mới"
                    >
                      +
                    </button>
                  </div>
                  {errors?.departmentId && <div className="text-danger small mt-1">{errors.departmentId}</div>}

                  {showAddDept && (
                    <div className="border rounded p-2 mt-2 bg-light">
                      <div className="row g-2">
                        <div className="col-7">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Tên phòng ban (VD: Marketing)"
                            value={newDeptName}
                            onChange={(e) => setNewDeptName(e.target.value)}
                          />
                        </div>
                        <div className="col-5">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Viết tắt (VD: MKT)"
                            value={newDeptCode}
                            onChange={(e) => setNewDeptCode(e.target.value.toUpperCase())}
                            maxLength={10}
                          />
                        </div>
                      </div>
                      {deptError && <div className="text-danger small mt-1">{deptError}</div>}
                      <div className="mt-2 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={handleAddDepartment}
                          disabled={!newDeptName || !newDeptCode}
                        >
                          Lưu phòng ban
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setShowAddDept(false)}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chức vụ - dropdown + thêm nhanh */}
                <div className="col-md-6">
                  <label className="form-label">Chức vụ *</label>
                  <div className="d-flex gap-2">
                    <select
                      className={`form-select ${errors?.positionId ? 'is-invalid' : ''}`}
                      name="positionId"
                      value={form.positionId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn chức vụ --</option>
                      {positions.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowAddPos((v) => !v)}
                      title="Thêm chức vụ mới"
                    >
                      +
                    </button>
                  </div>
                  {errors?.positionId && <div className="text-danger small mt-1">{errors.positionId}</div>}

                  {showAddPos && (
                    <div className="border rounded p-2 mt-2 bg-light">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Tên chức vụ (VD: Tổ trưởng)"
                        value={newPosName}
                        onChange={(e) => setNewPosName(e.target.value)}
                      />
                      {posError && <div className="text-danger small mt-1">{posError}</div>}
                      <div className="mt-2 d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={handleAddPosition}
                          disabled={!newPosName}
                        >
                          Lưu chức vụ
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setShowAddPos(false)}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Lương (VNĐ)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                {editingEmployee ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
