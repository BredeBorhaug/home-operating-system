const forge = require("node-forge")

/**
 * Generates a dummy key/cert pair for development use.
 */
module.exports = () => {
	const pki = forge.pki
	const keys = pki.rsa.generateKeyPair(2048)
	const cert = pki.createCertificate()

	cert.publicKey = keys.publicKey
	cert.serialNumber = Date.now().toString()
	cert.validity.notBefore = new Date()
	cert.validity.notAfter = new Date()
	cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)

	const attrs = [
		{
			name: "commonName",
			value: "veracity"
		},
		{
			name: "countryName",
			value: "NO"
		},
		{
			name: "localityName",
			value: "Hovik"
		},
		{
			name: "organizationName",
			value: "Veracity"
		}
	]

	cert.setSubject(attrs)
	cert.setIssuer(attrs)
	cert.setExtensions([
		{
			name: "basicConstraints",
			cA: true
		},
		{
			name: "keyUsage",
			keyCertSign: true,
			digitalSignature: true,
			nonRepudiation: true,
			keyEncipherment: true,
			dataEncipherment: true
		},
		{
			name: "extKeyUsage",
			serverAuth: true,
			clientAuth: true,
			codeSigning: true,
			emailProtection: true,
			timeStamping: true
		},
		{
			name: "nsCertType",
			client: true,
			server: true,
			email: true,
			objsign: true,
			sslCA: true,
			emailCA: true,
			objCA: true
		},
		{
			name: "subjectAltName",
			altNames: [
				{
					type: 6, // URI
					value: "http://example.org/webid#me"
				},
				{
					type: 7, // IP
					ip: "127.0.0.1"
				}
			]
		},
		{
			name: "subjectKeyIdentifier"
		}
	])

	cert.sign(keys.privateKey, forge.md.sha256.create())
	const privPem = pki.privateKeyToPem(keys.privateKey)
	const certPem = pki.certificateToPem(cert)

	return {
		key: privPem,
		cert: certPem
	}
}