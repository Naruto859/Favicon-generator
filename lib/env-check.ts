"use server"

export async function checkEmailEnvironmentVariables() {
  const requiredVars = ["EMAIL_PASSWORD"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  return {
    isConfigured: missingVars.length === 0,
    missingVars,
    message:
      missingVars.length > 0
        ? `Missing required environment variables: ${missingVars.join(", ")}`
        : "All required environment variables are configured",
  }
}
