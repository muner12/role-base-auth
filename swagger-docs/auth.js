/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Result:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 auth:
 *                   type: boolean
 *       409:
 *         description: Username or email already exists
 *       400:
 *         description: Validation error
 *
 * /api/studentRegister:
 *   post:
 *     summary: Register a new student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       409:
 *         description: Username or email already exists
 *       400:
 *         description: Validation error
 *
 * /api/teacherRegister:
 *   post:
 *     summary: Register a new teacher
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *       409:
 *         description: Username or email already exists
 *       400:
 *         description: Validation error
 *
 * /api/login:
 *   post:
 *     summary: Login for general users
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInfo:
 *                   type: object
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: number
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *       400:
 *         description: Validation error
 *
 * /api/studentLogin:
 *   post:
 *     summary: Login for students
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInfo:
 *                   type: object
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *
 * /api/teacherLogin:
 *   post:
 *     summary: Login for teachers
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInfo:
 *                   type: object
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *
 * /api/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid refresh token
 */
