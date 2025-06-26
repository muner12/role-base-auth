/**
 * @swagger
 * /api/webhook:
 *   post:
 *     summary: Process webhook data
 *     tags: [Webhook]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
