/**
 * @swagger
 * /api/viewStudentByTeacher:
 *   post:
 *     summary: View students (for teachers)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Student data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requires Teacher role
 *
 * /api/studentAttendance:
 *   post:
 *     summary: Mark student attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requires Student role
 *
 * /api/viewStudentAttendance:
 *   post:
 *     summary: View student attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Attendance data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requires Student role
 *       404:
 *         description: Attendance records not found
 */
