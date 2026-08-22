export default function EmployeeTable({ employees, onEdit, onDelete }) {
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return ''
    return new Intl.NumberFormat('vi-VN').format(value) + ' đ'
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Lương</th>
            <th style={{ width: 140 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan="10" className="text-center text-muted py-4">
                Không có nhân viên nào
              </td>
            </tr>
          )}
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="fw-semibold">{emp.employeeCode}</td>
              <td>{emp.fullName}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.gender}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department ? `${emp.department.name} (${emp.department.code})` : ''}</td>
              <td>{emp.position?.name}</td>
              <td>{formatCurrency(emp.salary)}</td>
              <td className="action-btns">
                <button className="btn btn-sm btn-warning" onClick={() => onEdit(emp)}>
                  Sửa
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(emp)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
