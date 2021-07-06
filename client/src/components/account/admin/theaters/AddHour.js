import React, { useContext, useEffect } from 'react'
import { SlotHoursContext } from '../../../../contexts/SlotHoursContext';

export default function AddHour({ removeHour, id }) {
    const { hoursData, hoursDataDispatch } = useContext(SlotHoursContext)
    useEffect(() => {

    }, [hoursData.hours])

    const onClickR = (event) => {
        removeHour(event, hoursData.hours)
    }
    return (
        <div className="add-time-slot__hour" onClick={onClickR} id={id}>
            <select>
                <option>09</option><option>10</option><option>11</option>
                <option>12</option><option>13</option><option>14</option><option>15</option>
                <option>16</option><option>17</option><option>18</option>
                <option>19</option><option>20</option>
            </select><select>
                <option>00</option><option>30</option>
            </select>
        </div>
    )
}
