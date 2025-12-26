import { HeadingDoctor } from "../HeadingDoctor"
import { FormUpPdf } from "./subirDocumento/FormUpPdf"

export const FormConsultaPatient = ({ patientId }: { patientId: string }) => {
  return (
    <div className="space-y-12 px-4 lg:px-0">
      <HeadingDoctor />
      <FormUpPdf patientId={patientId} />
    </div>
  )
}
